<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('skills')->insert([
            ['name' => 'PHP'],
            ['name' => 'JavaScript'],
            ['name' => 'Стрессоустойчивоть'],
            ['name' => 'Project Management'],
            ['name' => 'HTML'],
            ['name' => 'CSS'],
            ['name' => 'C#'],
            ['name' => 'Активные продажи'],
            ['name' => 'Обучаемость'],
            // Добавьте другие тестовые навыки
        ]);
    }
}
