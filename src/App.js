import React from 'react';
import './App.css';

function App() {
    const [showAllForms, setShowAllForms] = React.useState(false);
    const [allFormsJSON, setAllFormsJSON] = React.useState([]);
    const [subFormJSON, setSubFormJSON] = React.useState([]);
    const [currentFormType, setCurrentFormType] = React.useState("");
    const [label, setLabel] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [currentOption, setCurrentOption] = React.useState("");
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    
    function handleDelete(index) {
        const newFormJSON = [...subFormJSON];
        newFormJSON.splice(index, 1);
        setSubFormJSON(newFormJSON);
    }

    if (showAllForms) {
        return (
            <div className='allForms'>
                <h1>All Forms</h1>
                {
                    allFormsJSON.map((currentForm, index) => {
                        return (
                            <div className='form-box' key={index}>
                                <h3>Form {index + 1}</h3>
                                {
                                    currentForm.map((item, index) => {
                                        return (
                                            <div key={{index} + 1000}>
                                                {
                                                    item.name === "file_type" && (
                                                        <div>
                                                            <span>{item.label.label}</span>
                                                            <input type={item.type} />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    item.name === "dropdown_type" && (
                                                        <div>
                                                            <span>{item.label.label}</span>
                                                            <select>
                                                                {
                                                                    item.options.options.map((option, index) => {
                                                                        return (
                                                                            <option key={index}>{option}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>    
                                                    )
                                                }
                                                {
                                                    item.name === "text_type" && (
                                                        <div>
                                                            <span>{item.label.label}</span>
                                                            <input type={item.type} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <button
                    onClick={() => {
                        setShowAllForms(false);
                    }}
                >
                    Create new form
                </button>
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="form-preview">
                {
                    subFormJSON.length === 0 && (
                        <div>
                            <h1>Form is Empty!</h1>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                }
                            }>
                                Create new form
                            </button>
                        </div>
                    )
                }
                {
                    subFormJSON.length !== 0 && (
                        <div className="box">
                            <h1>Current Form</h1>
                            {
                                subFormJSON.map((item, index) => {
                                    if (item.name === "file_type") {
                                        return (
                                            <div className='form-verify-element' key={index}>
                                                <span>File Type</span>
                                                <span>{item.label.label}</span>
                                                <button
                                                    onClick={() => {
                                                        handleDelete(index);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        );
                                    } else if (item.name === "dropdown_type") {
                                        return (
                                            <div className='form-verify-element' key={index}>
                                                <span>Dropdown Type</span>
                                                <span>{item.label.label}</span>
                                                <br></br>
                                                <br></br>
                                                <span>Options:</span>
                                                {
                                                    item.options.options.map((option, index) => {
                                                        return (
                                                            <span>{option}</span>
                                                        );
                                                    }
                                                )}
                                                <br></br>
                                                <button
                                                    onClick={() => {
                                                        handleDelete(index);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        );
                                    } else if (item.name === "text_type") {
                                        return (
                                            <div className='form-verify-element' key={index}>
                                                <span>Text Type</span>
                                                <span>{item.label.label}</span>
                                                <button
                                                    onClick={() => {
                                                        handleDelete(index);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        );
                                    }
                                    return (<></>);
                                })
                            }
                            <button
                                onClick={() => {
                                    setAllFormsJSON([...allFormsJSON, subFormJSON]);
                                    setShowAllForms(true);
                                    setIsSubmitted(false);
                                    setSubFormJSON([]);
                                }
                            }>
                                Save Form
                            </button>
                        </div>
                    )
                }
            </div>
        );
    }

    return (
        <div className="App">
            <h1>Create Your Form!</h1>

            <button 
                value="file_type"
                onClick={(e) => {
                    setCurrentFormType(e.target.value);
                    setLabel("");
                }}
            >
                Add File
            </button>
            <button
                value="dropdown_type"
                onClick={(e) => {
                    setCurrentFormType(e.target.value);
                    setLabel("");
                }}
            >
                Add Dropdown
            </button>
            <button
                value="text_type"
                onClick={(e) => {
                    setCurrentFormType(e.target.value);
                    setLabel("");
                }}
            >
                Add Text
            </button>

            {
                currentFormType === "file_type" && (
                    <div>
                        <h3>File Type</h3>
                        <input 
                            type="text" 
                            value={label}
                            placeholder="Enter Label" 
                            onChange={(e) => {
                                    setLabel(e.target.value);
                                }
                            }
                        />
                        <button
                            onClick={() => {
                                if (label === "") {
                                    alert("Enter Label");
                                    return;
                                }
                                subFormJSON.push({
                                    label: {label},
                                    name: "file_type",
                                    type: "file"
                                });
                                setSubFormJSON(subFormJSON);
                                setLabel("");
                                alert("File Type Added!");
                            }}
                        >
                            Add
                        </button>
                    </div>
                )
            }

            {
                currentFormType === "dropdown_type" && (
                    <div>
                        <h3>Dropdown Type</h3>
                        <input 
                            type="text" 
                            value={label}
                            placeholder="Enter Label" 
                            onChange={(e) => {
                                    setLabel(e.target.value);
                                }
                            }
                        />
                        <input
                            type="text"
                            value={currentOption}
                            placeholder="Enter Options"
                            onChange={(e) => {
                                    setCurrentOption(e.target.value);
                                }
                            }
                        />
                        <button
                            onClick={() => {
                                if (currentOption === "") {
                                    alert("Please enter an option");
                                    return;
                                } 
                                options.push(currentOption)
                                setOptions(options);
                                setCurrentOption("");
                                alert("Option Added!")
                            }}
                        >
                            Add Option
                        </button>
                        <button
                            onClick={() => {
                                if (label === "") {
                                    alert("Enter Label");
                                    return;
                                }
                                if (options.length === 0) {
                                    alert("Please enter an option");
                                    return;
                                }

                                subFormJSON.push({
                                    label: {label},
                                    name: "dropdown_type",
                                    options: {options},
                                    type: "dropdown"
                                });

                                setSubFormJSON(subFormJSON);
                                setOptions([]);
                                setCurrentOption("");
                                setLabel("");
                                alert("Dropdown Type Added!");
                            }}
                        >
                            Add
                        </button>
                    </div>
                )
            }

            {
                currentFormType === "text_type" && (
                    <div>
                        <h3>Text Type</h3>
                        <input 
                            type="text" 
                            value={label}
                            placeholder="Enter Label" 
                            onChange={(e) => {
                                    setLabel(e.target.value);
                                }
                            }
                        />
                        <button
                            onClick={() => {
                                subFormJSON.push({
                                    label: {label},
                                    name: "text_type",
                                    type: "text"
                                });
                                setSubFormJSON(subFormJSON);
                                setLabel("");
                                alert("Text Type Added!");
                            }}
                        >
                            Add
                        </button>
                        </div>
                )
            }

            <br></br>
            <button
                onClick={() => {
                        setIsSubmitted(true);
                    }
                }
            >
                Submit
            </button>

        </div>
    );
}

export default App;