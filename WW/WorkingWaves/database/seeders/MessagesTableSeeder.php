<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('messages')->insert([
            ['chat_id' => 1, 'sender_id' => 1, 'sender_type' => 'job_seeker', 'content' => 'Hello, I am interested in this job.'],
            ['chat_id' => 1, 'sender_id' => 2, 'sender_type' => 'company', 'content' => 'Hi, we received your application.'],
            // Добавьте другие тестовые сообщения
        ]);
    }
}
