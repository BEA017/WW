<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            ['name'=>'Иванов Иван Иванович', 'email' => 'employer1@example.com', 'password' => Hash::make('password123'), 'role' => 'employer', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Петров Петр Петрович', 'email' => 'jobseeker1@example.com', 'password' => Hash::make('password123'), 'role' => 'job_seeker', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Высоцкий Владимир Семенович', 'email' => 'employer2@example.com', 'password' => Hash::make('password123'), 'role' => 'employer', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Кондратьев Анатолий Михайлович',  'email' => 'jobseeker2@example.com', 'password' => Hash::make('password123'), 'role' => 'job_seeker', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Летов Егор Егорович', 'email' => 'employer3@example.com', 'password' => Hash::make('password123'), 'role' => 'employer', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Николаев Николай Николаевич', 'email' => 'jobseeker3@example.com', 'password' => Hash::make('password123'), 'role' => 'job_seeker', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Сидоров Марк Маркович', 'email' => 'employer4@example.com', 'password' => Hash::make('password123'), 'role' => 'employer', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Белый Виктор Викторович', 'email' => 'jobseeker4@example.com', 'password' => Hash::make('password123'), 'role' => 'job_seeker', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Серая София Викторовна', 'email' => 'employer5@example.com', 'password' => Hash::make('password123'), 'role' => 'employer', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Черных Артем Юрьевич','email' => 'jobseeker5@example.com', 'password' => Hash::make('password123'), 'role' => 'job_seeker', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Админ2','email' => 'admin2@example.com', 'password' => Hash::make('password123'), 'role' => 'admin', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Админ1','email' => 'admin1@example.com', 'password' => Hash::make('password123'), 'role' => 'admin', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Модер1','email' => 'moder1@example.com', 'password' => Hash::make('password123'), 'role' => 'moder', 'email_verified_at'=>'2024-09-28 01:23:28'],
            ['name'=>'Модер2','email' => 'moder2@example.com', 'password' => Hash::make('password123'), 'role' => 'moder', 'email_verified_at'=>'2024-09-28 01:23:28'],
        ]);
    }
}
