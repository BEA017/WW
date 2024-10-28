<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmploymentTypeController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\WorkScheduleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
//*/
//Route::get('/employment_type', [EmploymentTypeController::class, 'index']);
//Route::get('/work_schedule', [WorkScheduleController::class, 'index']);
  Route::get('/login', [AuthController::class, 'login']);
//Route::get('/logout', [AuthController::class, 'logout']);
//
//Route::get('/', function () {
//    return redirect('http://185.244.49.95');
//});
Route::get('/{any}', function () {
  return file_get_contents(public_path('index.html'));
})->where('any', '.*');

require __DIR__.'/auth.php';
