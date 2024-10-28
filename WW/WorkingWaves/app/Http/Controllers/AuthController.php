<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            DB::beginTransaction();
            $request->validate([
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role' => 'required|string|in:job_seeker,employer,moder,admin',
            ]);

            $user = User::create([
                //            'name' => $request->name,
                'email' => $request->email,
                //            'age' => $request->age,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);

            if($request->role == "employer")
            {
                $company = Company::create([
                     'name'=>" ",
                     'user_id' => $user->id                    
                ]);
            }
            $token = $user->createToken('auth_token')->plainTextToken;
            $user->sendEmailVerificationNotification();
            DB::commit();

            return response()->json('ok');
//            return response()->json(['token' => $token, 'user' => $user]);
        } catch (\Exception $exception) {
            DB::rollBack();
            log::error($exception);
             return response()->json('error');

        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }


        if (!$user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Please verify your email address.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);

    }

    public function logout(Request $request)
    {
        //return response()->json("Заходит в выход");

        try {
            $user = $request->user();

            if ($user) {
                $user->currentAccessToken()->delete();
                return response()->json(['message' => 'Logged out']);
            } else {
                return response()->json(['error' => 'No authenticated user found'], 401);
            }
        } catch (\Exception $exception) {
            Log::error($exception->getMessage());
        }

    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
