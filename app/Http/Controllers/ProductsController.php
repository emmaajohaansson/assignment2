<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductsController extends BaseController
{
  public function showProducts() {
    $results = DB::select('select * from products');
    return $results;
    //return view('games', ['result' => $results]);
  }

  public function showOneProduct() {

  }

  public function createProduct() {

  }
}
