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

        Schema::create('jobs', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->unsignedBigInteger('company_id') ;
            $table->unsignedBigInteger('category_id');
            $table->string('title');
            $table->text('description');
            $table->text('requirements_education')->nullable();
            $table->text('requirements_experience')->nullable();
            $table->string('salary')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->integer('location_id')->nullable();
            $table->integer('work_schedule_id')->nullable();
            $table->integer('employment_type_id')->nullable();
            $table->integer('ad_status')->nullable();
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
