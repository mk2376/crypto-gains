<?php

namespace App\Http\Controllers\Api;

use App\Past_trades;
use App\Http\Controllers\Controller;
use App\Http\Helpers\InputHelper;
use App\Http\Helpers\ResponseHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Past_tradesController extends Controller {

    public function createPast_trade(Request $request) {
        $response = Past_trades::create($request);

        if (!empty($response['status']))
            return ResponseHelper::jsonResponse($response['errors'], $response['status'], $response['data']);

        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'));
    }

    public function updatePast_trade(Request $request) {
        $response = Past_trades::updateOne($request);

        if (!empty($response['status']))
            return ResponseHelper::jsonResponse($response['errors'], $response['status'], $response['data']);

        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'));
    }

    public function deletePast_trade(Request $request) {
        InputHelper::inputChecker(
            $request,
            [
                $request->id
            ],
            function (Request $request) {
                Past_trades::deleteOne($request);

                return ResponseHelper::jsonResponse(null, Response::HTTP_OK, config('messages.success'));
            }
        );
    }

    public function readPast_trades(Request $request) {
        $past_trades = Past_trades::readAll($request);

        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, $past_trades);
    }
}
