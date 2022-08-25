<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;



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
            'password' => $request['password'],
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

        // dd(Hash::make($request['password']));
        if (!$user) {
            return response()->json(['Error' => 'User Not Found'], 400);
        } elseif ($user->password != $request['password']) {
            return response()->json(['Error' => 'Invalid Password'], 400);
        } else
            return response()->json(['Users' => $user, 'Status' => 'Succesful'], 200);
    }
}
