<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobSkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('job_skills')->insert([
            ['job_id' => 1, 'skill_id' => 1],
            ['job_id' => 1, 'skill_id' => 2],
            ['job_id' => 2, 'skill_id' => 3],
            // Добавьте другие тестовые навыки для вакансий
        ]);
    }
}
