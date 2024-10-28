<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkSchedulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('work_schedules')->insert([
            [ 'name'=>'Удаленная работа'],
            [ 'name'=>'Полный день'],
            [ 'name'=>'Сменный график'],
            [ 'name'=>'Вахтовый метод'],
            [ 'name'=>'Гибкий график'],

         ]);
    }
}
