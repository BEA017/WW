<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (auth()->check() && in_array($request->user()->role, $roles)) {
            return $next($request);
      }
//  if (auth()->check() && in_array(auth()->user()->role, $roles)) {
//            return $next($request);
//        }

        return response()->json(['message' => 'Access Denied.'], 403);
    }
}
