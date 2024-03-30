import React, {useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/transactionReducer';
import Button from "../shared/Button";
import FormInput from "../shared/FormInput";
import FormLabel from "../shared/FormLabel";
import FormTextarea from "../shared/FormTextarea";
import FormSection from "../shared/FormSection";
import CreateTransactionButton from "../api/CreateTransaction";
import GetCurrencySelection from "../api/GetCurrencySelection";
import {GetCategorySelection, addCategory, deleteCategory} from "../api/GetCategorySelection";
import GetGroupSelection from "../api/GetGroupSelection";
import SplitAmountInput from "../api/SplitAmountInput";
import IconSelection from "../api/IconSelection";
import GetRecurringFrequencySelection from "../api/GetRecurringFrequencySelection";


const AddTransactionPage = ({ closePopup, userId }) => {
    const dispatch = useDispatch();

    const [transactionTitle, setTransactionTitle] = useState('');
    const [transactionTitleFieldColour, setTransactionTitleFieldColour] = useState('red');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryFieldColour, setSelectedCategoryFieldColour] = useState('red');
    const [categoryMessage, setCategoryMessage] = useState('');
    const [categoryMessageType, setCategoryMessageType] = useState('');
    const [categoryValue, setCategoryValue] = useState("");
    const [updateCategoryComponent, setUpdateCategoryComponent] = useState(false); 
    
    const [currency, setCurrency] = useState('');
    const [currencyFieldColour, setCurrencyFieldColour] = useState('red');

    const [amount, setAmount] = useState('');
    const [amountFieldColour, setAmountFieldColour] = useState('red');
    
    const [description, setDescription] = useState('');
    const [selectedIconOption, setIconSelectedOption] = useState(1);

    const [selectedGroupOption, setGroupOption] = useState('');
    const [selectedGroupOptionFieldColour, setSelectedGroupOptionFieldColour] = useState('gray');
    
    const [splitAmount, setSplitAmount] = useState('');
    const [splitAmountFieldColour, setSplitAmountFieldColour] = useState('gray');

    const [selectedRecurringFrequency, setRecurringFrequency] = useState('');
    const [selectedRecurringFrequencyFieldColour, setSelectedRecurringFrequencyFieldColour] = useState('gray');
    const [loadRecurringFrequencyField, setLoadRecurringFrequencyField] = useState(false);

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
    const [showLoadingMessage, setShowLoadingMessage] = useState(false); 

    useEffect(() => {
        if (categoryMessage) {
            const timeoutId = setTimeout(() => {
                setCategoryMessage('');
                setCategoryMessageType('');
            }, 5000); 

            return () => clearTimeout(timeoutId); 
        }
    }, [categoryMessage]);

    const handleTransactionTitle = (e) => {
        if(e.target.value === ""){
            setTransactionTitleFieldColour("red");
        } else {
            setTransactionTitleFieldColour("gray");
        }
        setTransactionTitle(e.target.value);
        console.log(transactionTitle);
    };

    const handleCategoryChange = (e) => {
        if(e.target.value === ""){
            setSelectedCategoryFieldColour("red");
        } else {
            setSelectedCategoryFieldColour("gray");
        }
        setSelectedCategory(e.target.value);
        console.log(selectedCategory);
      };

      const handleAmountChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        if(e.target.value === ""){
            setAmountFieldColour("red");
        } else {
            setAmountFieldColour("gray");
        }
        setAmount(numericValue);
        console.log(amount);
      };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        console.log(description);
    };

    const handleCurrency = (e) => {
        if(e.target.value === ""){
            setCurrencyFieldColour("red");
        } else {
            setCurrencyFieldColour("gray");
        }
        setCurrency(e.target.value);
        console.log(currency);
    };

    const handleIconOptionChange = (e) => {
        setIconSelectedOption(e);
        console.log(selectedIconOption);
    };

    const handleGroupChange = (e) => {
        setGroupOption(e.target.value);
        console.log(selectedGroupOption);
    };

    const handleSplitAmount = (e) => {
        setSplitAmount(e.target.value);
        console.log(splitAmount);
    };

    const handleRecurringFrequencyChange = (e) => {
        setRecurringFrequency(e.target.value);
        console.log(selectedRecurringFrequency);
    };

    const handleTransactionCreatedSucessButton  = (e) => {
        setShowSuccessMessage(false);
        resetFormFields();
        closePopup();
        dispatch(addTransaction());
    };

    /*Manage Category*/
    const handleCategoryInputChange = (event) => {
        setCategoryValue(event.target.value);
    };
    
    const handleAddCategoryClick = (event) => {
        event.preventDefault();
        setSelectedCategory('');
        setCategoryValue('');

        const data = {
            user_id: userId,
            category_name: categoryValue
        };
    
        addCategory(data, (response) => {
            if (response.status_code === 200) {
                setCategoryMessageType("success");
                setCategoryMessage(`Category added successfully: ${categoryValue}`);
                setSelectedCategory(response.category_id);
                setUpdateCategoryComponent(prevState => !prevState);
            } else {
                setCategoryMessageType("error");
                setCategoryMessage(`Please try another category.`);
            }
        });
    };
    
    const handleDeleteCategoryClick = (event)=>{
        event.preventDefault();
        setSelectedCategory('');
        setCategoryValue('');

        const data = {
            user_id: userId,
            category_id: selectedCategory
        };

        deleteCategory(data, (response)=>{
            if (response.status_code === 200) {
                setCategoryMessageType("success");
                setCategoryMessage(`Category deleted successfully: ${selectedCategory}`);
                setSelectedCategory(response.category_id);
                setUpdateCategoryComponent(prevState => !prevState);
            }  else {
                setCategoryMessageType("error");
                setCategoryMessage(`Failed to delete category.`);
            }

        });
    }

    const resetFormFields = () => {
        setTransactionTitle('');
        setTransactionTitleFieldColour('red');
    
        setSelectedCategory('');
        setSelectedCategoryFieldColour('red');
    
        setCurrency('');
        setCurrencyFieldColour('red');
    
        setAmount('');
        setAmountFieldColour('red');
    
        setDescription('');
        setIconSelectedOption(1);
    
        setGroupOption('');
        setSelectedGroupOptionFieldColour('gray');
    
        setSplitAmount('');
        setSplitAmountFieldColour('gray');
    
        setRecurringFrequency('');
        setSelectedRecurringFrequencyFieldColour('gray');
        setLoadRecurringFrequencyField(false);
    
        setShowErrorMessage(false);
        setShowSuccessMessage(false);
        setShowLoadingMessage(false);
    };

    return (
        <div className="relative bg-white rounded-lg shadow p-4 overflow-y-auto">
        <div className="flex items-center justify-between rounded-t dark:border-gray-600">
            <button
                type="button"
                className="text-black bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closePopup}
            >
                <span className="material-icons">
                    close
                </span>
            </button>

        </div>

        {showErrorMessage && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md">
                <p className="text-red-500">Failed to create transaction. Please check your inputs.</p>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowErrorMessage(false)}>
                Close
                </button>
            </div>
            </div>
        )}

        {showSuccessMessage && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-md shadow-md">
                    <p className="text-green-500">Transaction created successfully!</p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleTransactionCreatedSucessButton}>
                        Close
                    </button>
                </div>
            </div>
        )}
        {showLoadingMessage && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="p-8 rounded-md">
                <div className="flex items-center justify-center white-btn body-medium font-bold">
                    <span className="material-icons animate-spin h-5 w-5 mr-3">
                        autorenew
                    </span>
                    Processing...
                </div>
            </div>
        </div>
        )}
        
        <form class="p-7 md:p-7">
            <div className="grid grid-cols-2 gap-4 mb-4">

                <IconSelection
                    selectedOption = {selectedIconOption}
                    handleIconOptionChange = {handleIconOptionChange}
                />
                
                <FormSection col="2" place="1">
                    <FormLabel
                        label={"Title (Required)"}
                    />
                    <FormInput
                        id = {"title"}
                        placeholder = {"Title"}
                        type = {"text"}
                        value={transactionTitle}
                        onChange={handleTransactionTitle}
                        fieldColour = {transactionTitleFieldColour}
                    />
                </FormSection>

                <GetCategorySelection 
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    fieldColour = {selectedCategoryFieldColour}
                    userId={userId}
                    categoryAdded= {updateCategoryComponent}
                />

                <div className="col-span-2 flex justify-end">
                    <div id="categoryMessage" className={categoryMessageType === 'success' ? 'successMessage' : 'errorMessage'}>{categoryMessage}</div>

                    <input 
                        type="text" 
                        value={categoryValue} 
                        onChange={handleCategoryInputChange} 
                        placeholder="Enter Category" 
                        className="addCategoryInput"
                    />

                    <Button
                        color="addCategory"
                        text="Add Category"
                        onClick={handleAddCategoryClick} 
                    />

                    {selectedCategory && (
                        <Button
                            color="deleteCategory"
                            text="Delete Category"
                            onClick={handleDeleteCategoryClick}
                            disabled={!selectedCategory}
                        />
                    )}
                </div>

                <FormSection col="2">
                    <FormLabel
                        label={"Description"}
                    />
                    <FormTextarea
                        id={description}
                        placeholder={"Transaction Description"}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </FormSection>

                <GetCurrencySelection 
                    handleCurrency={handleCurrency}
                    currency={currency}
                    fieldColour = {currencyFieldColour}
                />

                <FormSection col="2" place="1">
                
                    <FormLabel label={"Amount (Required)"} />
                    <FormInput
                    id={"amount"}
                    placeholder={"Amount"}
                    type={"text"}
                    value={amount}
                    onChange={handleAmountChange}
                    fieldColour = {amountFieldColour}
                    />
                </FormSection>
                
                <GetGroupSelection 
                    handleGroupChange={handleGroupChange}
                    selectedGroupOption={selectedGroupOption}
                    fieldColour = {selectedGroupOptionFieldColour}
                    userId={userId}
                />

                <SplitAmountInput 
                    setSplitAmount={setSplitAmount}
                    splitAmount={splitAmount}
                    handleSplitAmount={handleSplitAmount}
                    selectedGroupOption={selectedGroupOption}
                    amount={amount}
                    fieldColour = {splitAmountFieldColour}
                />

                <GetRecurringFrequencySelection
                    selectedRecurringFrequency = {selectedRecurringFrequency}
                    handleRecurringFrequencyChange = {handleRecurringFrequencyChange}
                    fieldColour = {selectedRecurringFrequencyFieldColour}
                />

                <div className="col-span-2 sm:col-span-1"></div>

            </div>
            
        </form>
        <div className="px-7 md:px-7 py-0 grid gap-4 mb-4">
        <FormSection>
            <Button
                color={"white"}
                text={"Scan Receipt"}
                //onClick={handleButtonClick}
            />
        </FormSection>
        <CreateTransactionButton 
            transactionTitle = {transactionTitle}
            selectedCategory = {selectedCategory}
            currency = {currency}
            description = {description}
            selectedIconOption = {selectedIconOption}
            selectedGroupOption = {selectedGroupOption}
            splitAmount = {splitAmount}
            selectedRecurringFrequency  = {selectedRecurringFrequency}
            userId = {userId}
            setShowErrorMessage = {setShowErrorMessage}
            setShowSuccessMessage = {setShowSuccessMessage}
            setShowLoadingMessage = {setShowLoadingMessage}
        />
        </div>
    </div>

    );
}


export default AddTransactionPage;
