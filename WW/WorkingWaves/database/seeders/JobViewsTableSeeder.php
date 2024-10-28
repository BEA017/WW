<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobViewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('job_views')->insert([
            ['job_id' => 1, 'user_id' => 1, 'viewed_at' => now()],
            ['job_id' => 2, 'user_id' => 2, 'viewed_at' => now()],
            // Добавьте другие тестовые просмотры вакансий
        ]);
    }
}
