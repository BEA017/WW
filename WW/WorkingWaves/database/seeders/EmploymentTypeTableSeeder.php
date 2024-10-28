<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmploymentTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('employment_types')->insert([
            [ 'name'=>'Полная занятость'],
            [ 'name'=>'Частичная занятость'],
            [ 'name'=>'Проектная работа'],
            [ 'name'=>'Стажировка'],
            [ 'name'=>'Волонтерство'],
            [ 'name'=>'ГПХ/Совмещение'],

         ]);
    }
}
