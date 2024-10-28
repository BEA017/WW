<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:job_seeker,company',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed',
            'role' => 'required|in:job_seeker,company',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json($user, 200);
    }
    public function updateNameAndAvatar(Request $request)
    {


        try {
            $userId = Auth::id();
            // Находим резюме по ID и проверяем, что оно принадлежит текущему пользователю
            $user = User::where('id', $userId)->firstOrFail();
//            Log::info('Incoming request:', $request->all());
            // Валидация данных
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'avatar' => 'nullable', // Параметры для изображения

            ]);

            // Обработка файла изображения
            if (!empty($request->avatar)) {
                if ($request->hasFile('avatar')) {
                    // Удаляем старый файл, если существует
                    if ($user->avatar && file_exists(public_path('images/avatars/' . $user->avatar))) {
                        unlink(public_path('images/avatars/' . $user->avatar));
                    }

                    // Сохраняем новый файл
                    $avatar = $request->file('avatar');
                    $avatarName = time() . '_' . $avatar->getClientOriginalName();
                    $avatar->move(public_path('images/avatars'), $avatarName);
                    $validatedData['avatar'] = $avatarName;
                } else {
                    // Если нового файла нет, оставляем старое изображение
                    $validatedData['avatar'] = $user->avatar;
                }
            }

            // Обновляем основное резюме
            $user->update($validatedData);


            return response()->json(['message' => 'Резюме успешно обновлено']);

        } catch (\Exception $e) {
            Log::error('Error updating user:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }


    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
    public function verifyEmail(Request $request)
    {
        $timestamps = now();
        $user = User::find($request->route('id'));

        if (!$user) {
            // Редирект на страницу ошибки React
            return redirect(env('APP_URL') . '/error');
        }

        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
            // Редирект на страницу ошибки шифрования
            return redirect(env('APP_URL') . '/error');
        }

        if ($user->hasVerifiedEmail()) {
            // Редирект на React компонент, который обрабатывает сообщение о том, что email уже подтвержден
            return redirect(env('APP_URL') . '/user/email-verify?msg=already');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // Редирект на React компонент с сообщением об успешной верификации
        return redirect(env('APP_URL') . '/user/email-verify?msg=success');
    }
//    public function verifyEmail(Request $request){
//        $timestamps = now();
//        $user = User::find($request->route('id'));
//        if (!$user) {
//            return redirect(env('APP_URL').'/error');
//
//            return response()->json(['message' => 'Пользователь не найден!'], 404);
//        }
//
//        if (!hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification()))) {
//            return redirect(env('APP_URL').'/error');
//
//            return response()->json(['message' => 'Ошибка шифрования'], 403);
//        }
//
//        if ($user->hasVerifiedEmail()) {
////            return redirect(env('APP_URL').'/user/email-verify?msg=already');
//
//            return response()->json(['message' => 'Пользователь уже подтвердил!'], 404);
//
//        }
//
//        if ($user->markEmailAsVerified()) {
//            event(new Verified($user));
//        }
//       // return redirect(env('APP_URL').'/user/email-verify?msg=success');
//
//        return response()->json(['message' => 'Всё хорошо!'], 404);
//
//    }
}
