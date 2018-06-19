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
    //return view('products', ['result' => $results]);
  }

  public function showOneProduct($id) {
    $results = DB::select('select * from products where products.id = ?', [$id]);
    return $results;
  }

  public function createProduct(Request $request) {
    //$prodName = $request->input('title');
    //$prodBrand = $request->input('brand');
    //$prodImg = $request->input('image');
    //$prodDesc = $request->input('description');
    //$prodPrice = $request->input('price');
  }
}
