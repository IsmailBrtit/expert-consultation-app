import React, { useState } from 'react';
import doctorImg from '../../assets/images/doctorimg01.jpg';
import starIcon from '../../assets/images/starIcon.png';
import ExpertAbout from '../Expert/ExpertAbout';
import Feedback from '../Expert/Feedback';
import SidePanel from './SidePanel';
import { BASE_URL } from '../../config';
import usefetchdata from '../../hooks/usefetchdata';
import Loading from '../../components/loader/loading';
import Error from '../../components/Error/Error';
import { useParams } from 'react-router-dom';

const ExpertDetails = () => {
    const {id}=useParams();
    const [tab, setTab] = useState('about');
    const { data: expert,loading,error}=usefetchdata(`${BASE_URL}/api/v1/experts/${id}`);//1

    const {
        FullName,
        averageRating,
        timeSlots,
        reviews,
        bio,
        about,
        totalRating,
        photo,
        specialization,
        totalUsers,  
      } = expert;


    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
            {loading && <Loading/>}
            {error && <Error/>}
                { !loading && !error && <div className="grid grid-cols-3 gap-[50px]">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-5">
                            <figure className="max-w-[200px] max-h-[200px]">
                                <img src={expert.photo || doctorImg} alt="Doctor Mohamed Ali" className="w-full" />
                            </figure>

                            <div>
                                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                                    {expert.specialization}(Teacher)
                                </span>

                                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                                     {expert.FullName}(Mohamed Ali)
                                </h3>

                                <div className="flex items-center gap-[6px]">
                                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                        <img src={starIcon} alt="Rating" /> 4.8
                                    </span>

                                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                                        (272)
                                    </span>
                                </div>

                                <p className="text_para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px] mt-3">
                                     {expert.bio}(orientation)
                                </p>
                            </div>
                        </div>

                        <div className="mt-[90px] border-b border-solid border-[#0066ff34]">
                            <button 
                                onClick={() => setTab('about')} 
                                className="py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${tab === 'about' ? 'border-b border-solid border-primaryColor' : ''}">
                                About
                            </button>
                            <button 
                                onClick={() => setTab('feedback')} 
                                className="py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold ${tab === 'feedback' ? 'border-b border-solid border-primaryColor' : ''}">
                                Feedback
                            </button>
                        </div>
                        <div>
                          {tab == "about" && <ExpertAbout about={expert.about} FullName={expert.FullName}/> }
                          {tab == "feedback" && <Feedback/> }
                        </div>
                    </div>
                    <div>
                      <SidePanel ticketPrice={expert.ticketPrice} timeSlots={expert.timeSlots}/>
                    </div>
                </div>}
            </div>
        </section>
    );
};

export default ExpertDetails;