<?php

namespace App\Http\Helpers;

class CalculateGainsHelper {
    public static function calculateGains($past_trade) {
        $i_p = $past_trade->initial_price;
        $f_p = $past_trade->final_price;

        $past_trade->profit_value = $f_p - $i_p;
        $past_trade->profit_percent = ($f_p / $i_p - 1) * 100;
    }
}