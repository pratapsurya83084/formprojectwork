<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // up methos create a colomn and run the migrate
    public function up(): void
    {
        Schema::table('registers', function (Blueprint $table) {
            // Add new column 'service'
            $table->string('service')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('registers', function (Blueprint $table) {
            //
        });
    }
};
