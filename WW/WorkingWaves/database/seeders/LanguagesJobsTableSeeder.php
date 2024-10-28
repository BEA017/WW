<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguagesJobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('languages_jobs')->insert([
            ['job_id' => 1, 'language_id' => 1, 'language_level' => "A1"],
            ['job_id' => 2, 'language_id' => 1, 'language_level' => "B1"],
            ['job_id' => 3, 'language_id' => 1, 'language_level' => "Родной"],
            ['job_id' => 4, 'language_id' => 1, 'language_level' => "Средний"],


            // Добавьте другие тестовые навыки для вакансий
        ]);
    }
}
