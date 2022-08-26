<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Auth;
use Tymon\JWTAuth\JWT;



class UserController extends Controller
{
    //
    public function register(request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|min:8',
        ], [
            'email.required' => 'Please Enter an E-mail Address',
            'password.required' => 'Please Enter a password Address',

        ]);
        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);
        User::create([
            'first_name' => $request['name'],
            'email' => $request['email'],
            'password' => HASH::make($request['password']),
        ]);
        return response()->json(['Success' => 'User Created', 'User' => $request->all()], 200);

        // return response()->json(['Success' => "done"], 400);
    }
    public function login(request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Please Enter an E-mail Address',
            'password.required' => 'Please Enter a password Address',

        ]);
        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);

        $user = user::where('email', $request->email)->first();
        if (!$token = auth()->attempt($validator->validated()))
            return response()->json(['error' => 'unauthorised']);
        return $this->returnToken($token);

        // dd(Hash::make($request['password']));
        // if (!$user) {
        //     return response()->json(['Error' => 'User Not Found'], 400);
        // } elseif ($user->password != $request['password']) {
        //     return response()->json(['Error' => 'Invalid Password'], 400);
        // } else
        //     return response()->json(['Users' => $user, 'Status' => 'Succesful'], 200);
    }
    public function user(request $request)
    {
        // dd($request);
        return response()->json(Auth::user());
    }
    public function returnToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 60000
        ]);
    }
}
