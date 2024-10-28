<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResumeSkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('resume_skills')->insert([
            ['resume_id' => 1, 'skill_id' => 1],
            ['resume_id' => 1, 'skill_id' => 2],
            ['resume_id' => 2, 'skill_id' => 3],
            // Добавьте другие тестовые навыки для вакансий
        ]);
    }
}
