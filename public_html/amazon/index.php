<html>
<!--
* CS-250 Coursework 2 Part B
* Task 3: Amazon order history page.
* Date: 2017-12-04
* Author: Robert Hardy, Kristofer Ralph
-->
<head>
    <title>Amazon</title>
</head>
<body>
<?php
require_once("../../application/config/dbconnect.php");
?>

<!-- Generate a list of User ID's to the console, for the user to view and try -->
<script>
    console.log("Below are some user ID's to try:")
</script>
<?php
$queryUserPrompt = "SELECT UserID FROM orders;";
$resultUserPrompt = mysqli_query($conn, $queryUserPrompt);
while ($rowUserPrompt = mysqli_fetch_array($resultUserPrompt)) {
    echo "<script>" .
            "console.log(' - " . $rowUserPrompt['UserID'] . "')" .
         "</script>";
}
?>
<script>
    console.log("Above are some user ID's to try.")
</script>

<div title="mainBody" style="max-width: 710px">

    <div title="bannerTop" style="width: auto">
        <img src="images/amazon_topbanner.png">
    </div>

    <table title="orderTable" width="710" cellspacing="0" style="border-collapse: collapse">
        <?php
        /* On form submit, take text box value if not empty and produce order page, else display error message.*/
        if (isset($_POST['submit']) && !empty($_POST['userIDinput'])) {
            $userID = $_POST['userIDinput'];
            /*echo "<h1>You entered user ID:" . $userID . "</h1>";*/

            $queryGetUser = "SELECT * FROM users WHERE UserID = " . $userID . ";";
            $resultGetUser = mysqli_query($conn, $queryGetUser);
            /*If number of rows in table is more than zero, display results, else display error message.*/
            if (!(mysqli_num_rows($resultGetUser) == 0)) {

                // Split user details row into array.
                $rowGetUser = mysqli_fetch_array($resultGetUser);

                // Get number of orders placed by user.
                $queryOrdersPlaced = "SELECT count(*) AS ordersPlaced FROM orders
                                      WHERE UserID = " . $userID . ";";
                $resultOrdersPlaced = mysqli_query($conn, $queryOrdersPlaced);
                $rowOrdersPlaced = mysqli_fetch_array($resultOrdersPlaced);

                // Get number of books bought in the order.
                $queryBooksBought = "SELECT sum(Quantity) AS booksBought FROM trans, orders
                                    WHERE orders.OrderID = trans.OrderID AND UserID = " . $userID . ";";
                $resultBooksBought = mysqli_query($conn, $queryBooksBought);
                $rowBooksBought = mysqli_fetch_array($resultBooksBought);

                // First row: Customer details and order summary.
                echo "<tr>";
                // First two columns: User Details
                echo "<td colspan='2'><span style='font-size: large'>User Details:</span>";
                echo "</br>";
                echo "UserID: " . $rowGetUser["UserID"];
                echo "</br>";
                echo "Country: " . $rowGetUser["Country"];
                echo "</td>";
                // Last two columns: Order Summary
                echo "<td colspan='2'><span style='font-size: large'>Order Summary:</span>";
                echo "</br>";
                echo $rowOrdersPlaced["ordersPlaced"] . " orders placed";
                echo "</br>";
                if ($rowBooksBought["booksBought"] == null) {
                    echo "0 books bought";
                } else if ($rowBooksBought["booksBought"] == 1) {
                    echo "1 book bought"; // remove "s" from books.
                } else {
                    echo $rowBooksBought["booksBought"] . " books bought";
                }
                echo "</td>";
                echo "</tr>";

                /* Orders Header Strip:
                Detail the year of order placed, the total of the order, the discount price if any, and order id. */
                $queryOrderStrip = "SELECT orders.Year, Totalpay, (sum(Unitprice * Quantity) - Totalpay) AS Discount, orders.OrderID
                                    FROM orders, trans, books
                                    WHERE UserID = " . $userID . "
                                      AND orders.OrderID = trans.OrderID
                                          AND books.ISBN = trans.ISBN
                                    GROUP BY orders.OrderID
                                    ORDER BY orders.Year DESC;";
                $resultOrderStrip = mysqli_query($conn, $queryOrderStrip);

                // Loop for every order the user has (while there are rows in the table).

                while ($rowOrderStrip = mysqli_fetch_array($resultOrderStrip)) {
                    // Pretty spacer between orders:
                    echo "<tr style='border-bottom: 1px solid lightcyan;'><td style='height: 7px'></td></tr>";
                    echo "<tr><td style='height: 7px'></td></tr>";

                    echo "<tr style='backgrounds-color: lightgrey;'>";
                    echo "<td>Order placed</br>" . $rowOrderStrip['Year'] . "</td>";
                    echo "<td>Total</br>£" . $rowOrderStrip['Totalpay'] . "</td>";
                    // Check if any discount was given before displaying the discount.
                    if ($rowOrderStrip['Discount'] > 0) {
                        echo "<td>Discount</br>£" . $rowOrderStrip['Discount'] . "</td>";
                    } else {
                        echo "<td></td>"; // empty table cell.
                    }
                    echo "<td>Order ID</br>" . $rowOrderStrip['OrderID'] . "</td>";
                    echo "</tr>";

                    /*
                     * Loop for every item within the order:
                     * Create the query, get results, split into array for each row. Display contents of each row.
                     * */
                    // Get details of each order.
                    $queryOrderItems = "SELECT * FROM orders, trans, books
                                        WHERE orders.OrderID = " . $rowOrderStrip['OrderID'] . "
                                        AND orders.OrderID = trans.OrderID
                                        AND trans.ISBN = books.ISBN
                                        ORDER BY Genre ASC;";
                    $resultOrderItems = mysqli_query($conn, $queryOrderItems);
                    while ($rowOrderItems = mysqli_fetch_array($resultOrderItems)) {

                        echo "<tr>";
                        echo "<td><img src='" . $rowOrderItems['ImageURL'] . "'></td>";
                        echo "<td>";
                        // If book quantity is more than 1, then display "x of ", followed by book title.
                        if ($rowOrderItems['Quantity'] > 1) {
                            echo $rowOrderItems['Quantity'] . " of ";
                        }
                        echo $rowOrderItems['Title'];
                        echo "</br>" . $rowOrderItems['ISBN'];
                        echo "</br>£" . $rowOrderItems['Unitprice'];
                        /*
                         * Get average rating if there is one, display rating as stars.
                         * */
                        $queryUserRating = "SELECT avg(Rating) as avgRating FROM bookratings
                                            WHERE ISBN = '" . $rowOrderItems['ISBN'] . "';";
                        $resultUserRating = mysqli_query($conn, $queryUserRating);
                        $rowUserRating = mysqli_fetch_array($resultUserRating);
                        // Loop for the number of their rating, adding a star each time.
                        echo "</br>";
                        for ($i = 0; $i < $rowUserRating['avgRating']; $i++) {
                            echo "*";
                        }
                        echo "</td>";
                        echo "<td>" . $rowOrderItems['Genre'] . "</td>";

                        // Total price for items, format number to two decimal places
                        $priceQuantity = number_format(($rowOrderItems['Unitprice'] * $rowOrderItems['Quantity']),
                            2, '.', '');
                        echo "<td>£" . $priceQuantity . "</td>";

                    }
                }
            } else {
                echo "<h3 style='text-align: center'>User not found!</h3>";
            }
        } else {
            echo "<h3 style='text-align: center'>Please enter a user ID.</h3>
                    <p style='text-align: center;font-style: italic'>See console (F12) for a list of example ID's</p>";
        }
        ?>
    </table>


    <div title="bannerBottom" style="width: auto">
        <img src="images/amazon_bottombanner.png">
    </div>
    <div title="queryStrip">
        <!-- Pretty horizontal divider -->
        <table width="710" cellspacing="0" style="border-collapse: collapse">
            <tr style='border-bottom: 1px solid lightcyan;'>
                <td style='height: 7px'></td>
            </tr>
            <tr>
                <td style='height: 7px'></td>
            </tr>
        </table>
        <form method="post">
            <label><span style="font-weight: bold">Query</span> UserID:</label>
            <input type="text" title="UserID" name="userIDinput">
            <input type="submit" name="submit" value="Submit" style="float: right; margin-right: 50px">
        </form>
    </div>

</div>
</body>
</html>

