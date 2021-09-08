<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Helpers\CalculateGainsHelper;
use Illuminate\Support\Facades\Validator;

class Past_trades extends Model {

    protected $keyType = 'integer';

    protected $fillable = ['user_id', 'symbol', 'coins', 'initial_price', 'final_price', 'profit_value', 'profit_percent', 'created_at', 'updated_at'];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public static function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'symbol' => 'required|string|between:3,20',
            'coins' => 'required|integer|min:1',
            'initial_price' => 'required|numeric|min:0',
            'final_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return array(
                "data" => "Failed to create open order.",
                "errors" => $validator->errors(),
                "status" => 400,
            );
        }

        $past_trade = new Past_trades();

        $past_trade->user_id = $request->User()->id;
        $past_trade->symbol = $request->get('symbol');
        $past_trade->coins = $request->get('coins');
        $past_trade->initial_price = $request->get('initial_price');
        $past_trade->final_price = $request->get('final_price');
        CalculateGainsHelper::calculateGains($past_trade);

        $past_trade->save();

        return $past_trade;
    }

    public static function updateOne(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'symbol' => 'required|string|between:3,20',
            'coins' => 'required|integer|min:1',
            'initial_price' => 'required|numeric|min:0',
            'final_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return array(
                "data" => "Failed to create open order.",
                "errors" => $validator->errors(),
                "status" => 400,
            );
        }

        $past_trade = Past_trades::where('id',$request->get('id'))->first();

        $past_trade->symbol = $request->get('symbol');
        $past_trade->coins = $request->get('coins');
        $past_trade->initial_price = $request->get('initial_price');
        $past_trade->final_price = $request->get('final_price');
        CalculateGainsHelper::calculateGains($past_trade);

        $past_trade->save();

        return $past_trade;
    }

    public static function deleteOne(Request $request) {
        Past_trades::where('id',$request->get('id'))->delete();
    }

    public static function readAll(Request $request) {
        //echo("ID: ". $request->User()->id);
        //echo("All: ". Past_trades::where('user_id',$request->User()->id)->get());
        return Past_trades::where('user_id',$request->User()->id)->get();
    }
}
