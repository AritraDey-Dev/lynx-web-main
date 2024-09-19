import { API_BASE_URL, API_GET_DEPARTMENT } from "../../../utils/API_CONSTANTS";
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment, setDepartmentFound, setRemainingDepartment, setDepartmentId } from "../../../state";

const findDepartment = (dispatch, data, userRollNumber) => {
  let object = data.find(
    (item) =>
      item.rollNoPrefix === userRollNumber.toString().substring(0, 4)
  );
  console.log(object);
  //console.log(object._id);

  if (object === undefined || !object._id) {
    console.log("undefined object")
    //dispatch(setDepartmentFound(false));
    //dispatch(setRemainingDepartment(data));
  } else {
    //dispatch(setDepartmentFound(true));
    //dispatch(setDepartment(object.courseName + ' - ' + object.departmentName.toString()));
    //dispatch(setDepartmentId(object._id)); 
    return object._id;
  }
};

export const getDepartmentAPI = async (dispatch, userRollNumber) => {
  try {
    const response = await fetch(API_BASE_URL + API_GET_DEPARTMENT);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
  
    console.log('API Response:', data.result);

    const deptId =  findDepartment(dispatch, data.result, userRollNumber);
    console.log(deptId)
    return deptId;
  } catch (error) {
    if (error.message.includes('HTTP error')) {
      console.error('Server error');
    } else {
      console.error('Unexpected error', error);
    }
  }
};

export const useDepartment = () => {
  const dispatch = useDispatch();
  const userRollNumber = useSelector((state) => state.auth.user?.rollNoPrefix);

  return { getDepartmentAPI: () => getDepartmentAPI(dispatch, userRollNumber) };
};

