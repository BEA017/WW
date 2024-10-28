<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('languages_resumes', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->unsignedBigInteger('resume_id') ;
            $table->unsignedBigInteger('language_id') ;
            $table->string( 'language_level') ;

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('languages_resumes');
    }
};
