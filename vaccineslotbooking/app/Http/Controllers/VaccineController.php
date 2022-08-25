<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;

class VaccineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        // dd('hii');
        $bookings = Booking::all();
        return response()->json(['Bookings' => $bookings, 'Status' => 'Success'], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    public function checkAvailablity(request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
        ], [
            'date.required' => 'Please select a date',

        ]);
        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);
        $date = $request->date;
        $bookings = Booking::where('booking_date', $date)->get()->count();
        if ($bookings >= 5)
            return response()->json(['Error' => 'No Slots Available For this date! Select Another Date', 'Status' => 'Fail'], 400);
        return response()->json(['Status' => 'Proceed','Slots Remaining'=> 5-$bookings]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'adhaar_no' => 'required',
            'ph_no' => 'required',
            'address' => 'required',
            'last_name' => 'required',
            'date' => 'required'
        ]);
        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);
        $booking = new Booking();
        $booking->date=$request->date;
        return response()->json(['status'=>'success'],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
