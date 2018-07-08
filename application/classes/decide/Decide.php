<?php
/**
 * Decide.php
 *
 * @author Robert Hardy
 * @since 2018-07-08
 * Part of the rarh.io project.
 */

class Decide
{
    /**
     * Choose a random value from a given list of choices.
     * @param array $choices
     * @return mixed
     */
    public static function choose(array $choices)
    {
        $key = array_rand($choices);
        return $choices[$key];
    }

}