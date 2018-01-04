/**
 * Created by Robert Hardy on 12/02/2017.
 */


$(document).ready(function() {
    var windowY = $(window).height() - 204;
    $("#pdfEmbed").css("height", windowY);

    var options = {
        fallbackLink: '<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href="F:/Personal/_RARH_OngoingWIP/dirCV/CV_pdf.pdf">Download PDF</a></p>'
    };

    PDFObject.embed("http://rarh.io/dirCV/CV.pdf", "#pdfEmbed", options);
});

