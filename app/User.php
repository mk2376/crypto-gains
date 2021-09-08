<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Validator;

class User extends Authenticatable implements JWTSubject {

    protected $keyType = 'integer';

    protected $fillable = ['username', 'password', 'created_at', 'updated_at'];

    public function contracts() {
        return $this->hasMany('App\Contract');
    }

    public static function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|between:2,100|unique:users',
            'password' => 'required|string|between:6,200',
        ]);

        if ($validator->fails()) {
            return array(
                "data" => "Failed to register user.",
                "errors" => $validator->errors(),
                "status" => 400,
            );
        }

        $user = new User();

        if (!empty($request->get('username'))) {
            $user->username = $request->get('username');
        }
        if (!empty($request->get('password'))) {
            $user->password = bcrypt($request->get('password'));
        }

        $user->save();

        return $user;
    }

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function getAuthPassword() {
        return $this->password;
    }
}
