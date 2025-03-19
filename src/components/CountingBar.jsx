import React from 'react'
import CountUp from 'react-countup'
import {assets} from '../assets/assets_frontend/assets.js'

function CountingBar() {
  const stats = [
    {
      number: 500,
      text: "Patients Every Day",
      icon: assets.patient_icon
    },
    {
      number: 400,
      text: "Qualified Doctors",
      icon: assets.doctor_icon
    },
    {
      number: 12,
      text: "Years Experience",
      icon: assets.experience_icon
    },
    {
      number: 350,
      text: "Diagnosis Verity",
      icon: assets.diagnosis_icon
    }
  ]

  return (
    <div className="bg-[#0066ff] md:py-12 py-5 px-4">
      <div className="container mx-auto">
        <div className="grid md:text-[.9rem] text-[1rem] grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="flex justify-center mb-4">
                <img src={stat.icon} alt="" className="md:w-12 md:h-12 w-8 h-8" />
              </div>
              <h2 className="md:text-4xl text-2xl  font-bold mb-2">
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  suffix="+"
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h2>
              <p className="text-sm">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CountingBar