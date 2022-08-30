<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class VaccineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $now = date("Y-m-d");
        $bookings=Booking::all();
        foreach($bookings as $booking){
            if($booking->date > $now)
            $booking->has_expired = 1;

        }
    }
    public function index(Request $request)
    {
        //
        // dd('hii');
        // dd($request['date']);
        // dd($now);
        if ($request->date) {
            $bookings = Booking::where('booking_date', $request->date)->where('has_expired', 0)->join('users', 'users.id', '=', 'bookings.user_id')
            ->get(['users.*', 'bookings.*']);
        } else
            $bookings = Booking::where('has_expired', 0)->join('users', 'users.id', '=', 'bookings.user_id')
            ->get(['users.*', 'bookings.*']);
        // dd(count($bookings));
        if (count($bookings))
            return response()->json(['Bookings' => $bookings, 'Status' => 'Success'], 200);
        else
            return response()->json(['Status' => 'No bookings for the date selected'], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $user = Auth::user();
        return response()->json(['User' => $user, 200]);
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
        return response()->json(['Status' => 'Proceed', 'Slots Remaining' => 5 - $bookings]);
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
        $user = Auth::user();
        // dd(Auth::user());
        $previous_booking = Booking::where('user_id', $user->id)->first();
        // dd($previous_booking);
        if ($previous_booking)
            return response()->json(['errors' => 'You can only Book One Slot per User'], 400);

        $booking = new Booking();
        $booking->booking_date = $request->date;
        $booking->user_id = Auth::user()->id;
        $booking->save();
        $user->adhaar_no = $request->adhaar_no;
        $user->address = $request->address;
        $user->ph_no = $request->ph_no;
        $user->last_name = $request->last_name;
        $user->save();

        return response()->json(['status' => 'success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        //
        // dd(Auth::user()->id);
        $vaccineslot = Booking::where('user_id', Auth::user()->id)->where('has_expired', 0)->first();

        // dd($vaccineslot);
        return response()->json(['Status' => 'Success', 'Slot' => $vaccineslot,'User'=>$vaccineslot->User()->first()]);
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
        $vaccineslot = Booking::find($id)->where('has_expired', 0);

        return response()->json(['Status' => 'Success', 'Booking' => $vaccineslot]);
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
        $validator = Validator::make($request->all(), [
            'date' => 'required'
        ]);
        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);
        $vaccineslot = Booking::find($id)->where('has_expired', 0);

        $vaccineslot->booking_date = $request->date;
        $vaccineslot->save();


        return response()->json(['Status' => 'Success']);
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
        $vaccineslot = Booking::find($id);
        $vaccineslot->has_expired=1;
        $vaccineslot->save();
        return response()->json(['Status' => 'Success']);
    }
}
