import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';

export const GlobalVar = createContext(); // 전역변수 개념인 context를 선언, 정의

export const GlobalVariables = ({children}) => {
	const [centerType, setCenterType] = useState('전체');
	const [location, setLocation] = useState('지역별');
	const [treatment, setTreatment] = useState([]);
	const [nameToShow, setNameToShow] = useState('');
	const [rere, setRere]=useState(true);
	const [searchCenterType,setSearchCenterType] = useState([1,0,0,0]); //0번째가 1이면 전체 검색, [1], [2], [3]는 각각 대학병원 병의원 사설센터
	const [searchTreatmentType, setSearchTreatmentType]=useState([1,1,1,1,1,1,1,1]); // 0이면 선택 안됨, 1이면 선택됨

	// 검색한 병원정보 저장할 배열
	const [markerList, setMarkerList] = useState([]);
	const [markerFlag, setMarkerFlag] = useState(false)


	// 인증 됬는지 확인, 로그인 정보 저장
	const [loginCheck, setLoginCheck] = useState(false)
	const [profile, setProfile] = useState()
	

	const treatmentList = [
		'운동재활',
		'감각재활',
		'놀이치료',
		'행동치료',
		'언어치료',
		'심리치료',
		'심리운동',
		'청능치료',
	];
	const centerTypeList=[
		'전체', '대학병원', '병원,의원', '사설센터'
	];
	return (
		<GlobalVar.Provider
		value={{
			
			markerList,
			setMarkerList,
			markerFlag,
			setMarkerFlag,
			loginCheck,
			setLoginCheck,
			profile,
			setProfile,


			centerType,
			setCenterType,
			location,
			setLocation,
			treatment,
			setTreatment,
			treatmentList,
			centerTypeList,
			searchCenterType,
			setSearchCenterType,
			searchTreatmentType,
			setSearchTreatmentType,
			rere,
			setRere,
		}}>
		{children}
		</GlobalVar.Provider>
	);
};
