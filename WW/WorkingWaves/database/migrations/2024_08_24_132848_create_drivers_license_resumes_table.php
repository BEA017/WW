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
        Schema::create('drivers_license_resumes', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->unsignedBigInteger('resume_id') ;
            $table->unsignedBigInteger('license_id') ;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers_license_resumes');
    }
};
