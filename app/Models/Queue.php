<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;
    protected $fillable = [
        'patient_id',
        'queued_at',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
