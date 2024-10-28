<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg',
        ]);

        $path = $request->file('file')->store('files');

        $file = File::create([
            'path' => $path,
            'type' => $request->file('file')->getClientOriginalExtension(),
            'user_id' => $request->user()->id,
        ]);

        return response()->json($file, 201);
    }

    public function show(File $file)
    {
        return Storage::download($file->path);
    }

    public function destroy(File $file)
    {
        Storage::delete($file->path);
        $file->delete();

        return response()->json(null, 204);
    }
}
