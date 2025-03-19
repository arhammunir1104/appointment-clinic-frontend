import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-white'>
      <div className='container mx-auto px-4'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 py-16'>
          {/* Company Info */}
          <div className='space-y-6'>
            <img src={assets.logo} alt="Company Logo" className='h-12 w-auto' />
            <p className='text-gray-600 leading-relaxed max-w-lg'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className='space-y-6'>
            <h3 className='text-lg font-semibold text-gray-900'>COMPANY</h3>
            <ul className='space-y-4'>
              <li>
                <Link to="/" className='text-gray-600 hover:text-[#0066ff] transition-colors'>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className='text-gray-600 hover:text-[#0066ff] transition-colors'>
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className='text-gray-600 hover:text-[#0066ff] transition-colors'>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className='text-gray-600 hover:text-[#0066ff] transition-colors'>
                  Join
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-6'>
            <h3 className='text-lg font-semibold text-gray-900'>GET IN TOUCH</h3>
            <ul className='space-y-4'>
              <li className='flex items-center gap-3 text-gray-600'>
                <img src={assets.phone_icon} alt="" className='w-4 h-4' />
                <a href="tel:+92 301 2865 213" className='hover:text-[#0066ff] transition-colors'>
                +92 301 2865 213
                </a>
              </li>
              <li className='flex items-center gap-3 text-gray-600'>
                <img src={assets.email_icon} alt="" className='w-4 h-4' />
                <a href="mailto:arhammunir1104@gmail.com" className='hover:text-[#0066ff] transition-colors'>
                arhammunir1104@gmail.com
                </a>
              </li>
              <li className='flex items-center gap-3 text-gray-600'>
                <img src={assets.location_icon} alt="" className='w-4 h-4' />
                <span>123 Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-gray-200'>
          <div className='py-8 text-center text-gray-600 text-sm'>
            <p>Copyright © {new Date().getFullYear()} @ Arham Munir - All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer