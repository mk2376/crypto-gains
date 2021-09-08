<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Open_orders extends Model {

    protected $keyType = 'integer';

    protected $fillable = ['user_id', 'symbol', 'coins', 'initial_price', 'created_at', 'updated_at'];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public static function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'symbol' => 'required|string|between:3,20',
            'coins' => 'required|integer|min:1',
            'initial_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return array(
                "data" => "Failed to create open order.",
                "errors" => $validator->errors(),
                "status" => 400,
            );
        }

        $open_order = new Open_orders();

        $open_order->user_id = $request->User()->id;
        $open_order->symbol = $request->get('symbol');
        $open_order->coins = $request->get('coins');
        $open_order->initial_price = $request->get('initial_price');

        $open_order->save();

        return $open_order;

    }

    public static function updateOne(Request $request) {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'symbol' => 'required|string|between:3,20',
            'coins' => 'required|integer|min:1',
            'initial_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return array(
                "data" => "Failed to create open order.",
                "errors" => $validator->errors(),
                "status" => 400,
            );
        }

        $open_order = Open_orders::where('id',$request->get('id'))->first();

        $open_order->symbol = $request->get('symbol');
        $open_order->coins = $request->get('coins');
        $open_order->initial_price = $request->get('initial_price');

        $open_order->save();

        return $open_order;
    }

    public static function deleteOne(Request $request) {
        Open_orders::where('id',$request->get('id'))->delete();
    }

    public static function readAll(Request $request) {
        //echo("ID: ". $request->User()->id);
        //echo("All: ". Open_orders::where('user_id',$request->User()->id)->get());
        return Open_orders::where('user_id',$request->User()->id)->get();
    }
}
