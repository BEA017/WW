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
        Schema::create('resumes', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->integer("user_id")->nullable();
            $table->string("resume_name")->nullable();
            $table->string("email")->nullable();
            $table->string("phone")->nullable();
            $table->string("avatar")->nullable();
            $table->integer("location_id")->nullable();
            $table->string("desired_salary")->nullable();
            $table->text("experience")->nullable();
            $table->text("education")->nullable();
            $table->text("about_me")->nullable();
            $table->integer("category_id")->nullable();
            $table->integer('ad_status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resume');
    }
};
