<?php

namespace App\Http\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class InputHelper {
    public static function inputChecker($request, $items, $function) {
        try {
            if (!empty($items)) {
                if (ArrayHelper::arrayIsset($items)) {
                    $function($request);
                } else {
                    ResponseHelper::jsonResponse(null, Response::HTTP_BAD_REQUEST, "All requierd fields have to be filled!")->send();
                }
            } else {
                $function($request);
            }
        } catch (\Exception $exception) {
            ResponseHelper::jsonResponse($exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR, null)->send();
        }
    }
}