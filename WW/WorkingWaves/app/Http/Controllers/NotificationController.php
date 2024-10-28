<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {

        return $request->user()->notifications;
    }

    public function show(Notification $notification)
    {
        return $notification;
    }

    public function update(Request $request, Notification $notification)
    {
        $notification->update(['read' => true]);

        return response()->json($notification, 200);
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json(null, 204);
    }
}

    //
    //class NotificationController extends Controller
    //{
    //    public function index(Request $request)
    //    {
    //        return $request->user()->notifications;
    //    }
    //
    //    public function show(Notification $notification)
    //    {
    //        return $notification;
    //    }
    //
    //    public function update(Request $request, Notification $notification)
    //    {
    //        $notification->update(['read' => true]);
    //
    //        return response()->json($notification, 200);
    //    }
    //
    //    public function destroy(Notification $notification)
    //    {
    //        $notification->delete();
    //
    //        return response()->json(null, 204);
    //    }
    //}
