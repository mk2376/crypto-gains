<?php

namespace App\Http\Controllers\Api;

use App\Open_orders;
use App\Past_trades;
use App\Http\Controllers\Controller;
use App\Http\Helpers\InputHelper;
use App\Http\Helpers\ResponseHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Open_ordersController extends Controller {

    public function createOpen_order(Request $request) {
        $response = Open_orders::create($request);

        if (!empty($response['status']))
            return ResponseHelper::jsonResponse($response['errors'], $response['status'], $response['data']);

        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'));
    }

    public function updateOpen_order(Request $request) {
        $response = Open_orders::updateOne($request);

        if (!empty($response['status']))
            return ResponseHelper::jsonResponse($response['errors'], $response['status'], $response['data']);

        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'));
    }

    public function deleteOpen_order(Request $request) {
        InputHelper::inputChecker(
            $request,
            [
                $request->id
            ],
            function (Request $request) {
                Open_orders::deleteOne($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'));
            }
        );
    }

    public function archiveOpen_order(Request $request) {
        //echo($request);
        //echo("ID: ". $request->id. "|");

        InputHelper::inputChecker(
            $request,
            [
                $request->id,
                $request->symbol,
                $request->coins,
                $request->initial_price,
                $request->final_price,
            ],
            function (Request $request) {
                $response = Past_trades::create($request);

                if (!empty($response['status']))
                    return ResponseHelper::jsonResponse($response['errors'], $response['status'], $response['data']);

                Open_orders::deleteOne($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'));
            }
        );
    }

    public function readOpen_orders(Request $request) {
        $open_orders = Open_orders::readAll($request);

        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, $open_orders);
    }
}
