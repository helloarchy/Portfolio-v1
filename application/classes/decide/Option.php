<?php
/**
 * Option.php
 *
 * @author Robert Hardy
 * @since 2018-07-08
 * Part of the rarh.io project.
 */


/**
 * Class Option
 *
 */
class Option
{
    private $value; // The string value of the choice
    private $shortlisted; // Whether the user has shortlisted this choice or not

    /**
     * Option constructor.
     * @param $value
     */
    public function __construct($value)
    {
        $this->value = $value;
    }


    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }


    /**
     * @param mixed $value
     */
    public function setValue(string $value)
    {
        $this->value = $value;
    }


    /**
     * Set whether this option is shortlisted or not
     * @param $value
     */
    public function setShortlisted(bool $value)
    {
        $this->shortlisted = $value;
    }


    /**
     * @return mixed
     */
    public function getShortlisted()
    {
        return $this->shortlisted;
    }
}