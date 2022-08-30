<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;


class Booking extends Authenticatable implements JWTSubject
{
    use HasFactory;
    public function getJWTIdentifier(){
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}
