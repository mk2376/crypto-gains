<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Controllers\Controller;
use App\Http\Helpers\InputHelper;
use App\Http\Helpers\ResponseHelper;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'signUp']]);
    }

    public function signUp(Request $request) {
        $response = User::create($request);
        //echo(json_encode($response));

        if (!empty($response['status']))
            return ResponseHelper::jsonResponse($response['errors'], $response['status'], $response['data']);

            //echo("Login !");
        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, 'User registered successfully.');
    }

    public function login(Request $request) {
        $token = $this->guard($request->username, $request->password);

        if ($token) {
            return ResponseHelper::jsonResponse(null, Response::HTTP_OK, 'User login successfull.')->header('Authorization', $token);
        } else {
            return ResponseHelper::jsonResponse(["Wrong username or password."], Response::HTTP_BAD_REQUEST, config('messages.fail'));
        }
    }

    public function logout() {
        echo("Logout !");
        auth()->logout();

        return ResponseHelper::jsonResponse(null, Response::HTTP_OK, 'Successfully logged out');
    }

    public function refresh() {
        return $this->auth()->refresh();
    }


    private function guard($username, $password) {
        return Auth::guard('api')->attempt(array('username' => $username, 'password' => $password));
    }

}