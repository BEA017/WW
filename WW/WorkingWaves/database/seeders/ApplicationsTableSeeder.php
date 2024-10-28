<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApplicationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('applications')->insert([
            ['job_id' => 1, 'job_seeker_id' => 1, 'cover_letter' => 'I am very interested in this position because...', 'status' => 'pending'],
            ['job_id' => 2, 'job_seeker_id' => 2, 'cover_letter' => 'My experience aligns perfectly with the requirements of this job.', 'status' => 'pending'],
            // Добавьте другие тестовые отклики
        ]);
    }
}
