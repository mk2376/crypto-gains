<?php

namespace App\Http\Helpers;

use Illuminate\Http\JsonResponse;

class ResponseHelper {
    public static function jsonResponse($errors, $status, $data) {
        return response()->json(array_combine(config('app.response_keys'), [$errors, $status, $data]), $status);
    }
}