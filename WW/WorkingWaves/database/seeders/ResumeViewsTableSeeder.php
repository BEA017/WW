<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResumeViewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('resume_views')->insert([
            ['resume_id' => 1, 'user_id' => 1, 'viewed_at' => now()],
            ['resume_id' => 2, 'user_id' => 2, 'viewed_at' => now()],
            // Добавьте другие тестовые просмотры резюме
        ]);
    }
}
