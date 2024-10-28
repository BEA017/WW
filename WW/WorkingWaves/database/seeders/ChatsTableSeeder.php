<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('chats')->insert([
            ['job_id' => 1, 'job_seeker_id' => 1, 'company_id' => 1],
            ['job_id' => 2, 'job_seeker_id' => 2, 'company_id' => 2],
            // Добавьте другие тестовые чаты
        ]);
    }
}
