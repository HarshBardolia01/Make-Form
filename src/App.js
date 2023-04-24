import React from 'react';
import './App.css';

function App() {
    const [formJSON, setFormJSON] = React.useState([]);
    const [currentElementType, setCurrentElementType] = React.useState("");
    const [label, setLabel] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [currentOption, setCurrentOption] = React.useState("");
    const [isSaved, setIsSaved] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [submittedForm, setSubmittedForm] = React.useState({});

    function handleElementClick(event) {
        setCurrentElementType(event.target.value);
        setLabel("");
    }

    function handleLabelChange(event) {
        setLabel(event.target.value);
    }

    function handleDelete(index) {
        const newFormJSON = [...formJSON];
        newFormJSON.splice(index, 1);
        setFormJSON(newFormJSON);
    }

    function alreadyPresent(currentElement) {
        let currentFormElement = formJSON.filter((item) => {
            return item.type === currentElement.type;
        })

        currentFormElement = currentFormElement.filter((item) => {
            return item.label === currentElement.label;
        })

        let isPresent = true;

        if (currentFormElement.length === 0) {
            return false;
        }

        if (currentElement.type === "dropdown") {
            for (let option of currentElement.options) {
                if (currentFormElement[0].options.includes(option) === false) {
                    isPresent = false;
                }
            }
        }

        return isPresent;
    }

    if (isSaved) {
        return (
            <div className='currentForm'>
                <h1>Form</h1>
                {
                    formJSON.map((item) => {
                        return (
                            <div className='element'>
                                {
                                    item.name === "file_type" && (
                                        <div>
                                            <span>{item.label}</span>
                                            <input
                                                type={item.type}
                                                onChange={(e) => {
                                                    const file = e.target.value;
                                                    setSubmittedForm({ ...submittedForm, [item.label]: file });
                                                }}
                                            />
                                        </div>
                                    )
                                }
                                {
                                    item.name === "dropdown_type" && (
                                        <div>
                                            <span>{item.label}</span>
                                            <select
                                                onChange={(e) => {
                                                    setSubmittedForm({ ...submittedForm, [item.label]: e.target.value });
                                                }}
                                            >
                                                {
                                                    item.options.map((option, index) => {
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
                                            <span>{item.label}</span>
                                            <input
                                                type={item.type}
                                                onChange={(e) => {
                                                    const text = e.target.value;
                                                    setSubmittedForm({ ...submittedForm, [item.label]: text });
                                                }}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        );
                    })
                }

                {
                    isSubmitted === false && (
                        <button
                            onClick={() => {
                                setIsSubmitted(true);
                            }}
                        >
                            Submit
                        </button>
                    )
                }

                {
                    isSubmitted && (
                        <div>
                            <h1>Submitted Form</h1>
                            {
                                Object.keys(submittedForm).map((key, index) => {
                                    return (
                                        <div className='submmitted-form-elements' key={index}>
                                            <span>{key}</span>
                                            <span>{submittedForm[key]}</span>
                                        </div>
                                    );
                                })
                            }
                            <div>
                                <button
                                    onClick={() => {
                                        setFormJSON([]);
                                        setCurrentElementType("");
                                        setLabel("");
                                        setOptions([]);
                                        setCurrentOption("");
                                        setIsSaved(false);
                                        setIsSubmitted(false);
                                        setSubmittedForm({});
                                    }}
                                >
                                    Create New Form
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }

    return (
        <div className='App'>
            <section className='addElementsSection'>
                <h1>Create Your Form!</h1>
                <button
                    value="file_type"
                    onClick={handleElementClick}
                >
                    Add File
                </button>
                <button
                    value="dropdown_type"
                    onClick={handleElementClick}
                >
                    Add Dropdown
                </button>
                <button
                    value="text_type"
                    onClick={handleElementClick}
                >
                    Add Text
                </button>

                {
                    currentElementType === "file_type" && (
                        <div>
                            <h3>File Type</h3>
                            <input
                                type="text"
                                value={label}
                                placeholder="Enter Label"
                                onChange={handleLabelChange}
                            />
                            <button
                                onClick={() => {
                                    if (label === "") {
                                        alert("Label cannot be empty!");
                                        return;
                                    }

                                    const currentElement = {
                                        type: "file",
                                        name: "file_type",
                                        label
                                    }

                                    // handle error: if currentElement is already in formJSON, then don't add it
                                    if (alreadyPresent(currentElement)) {
                                        alert("Element already present!");
                                        setLabel("");
                                        return;
                                    }

                                    setFormJSON([...formJSON, currentElement]);
                                    setCurrentElementType("");
                                    setLabel("");
                                }}
                            >
                                Add
                            </button>
                        </div>
                    )
                }

                {
                    currentElementType === "dropdown_type" && (
                        <div>
                            <h3>Dropdown Type</h3>
                            <input
                                type="text"
                                value={label}
                                placeholder="Enter Label"
                                onChange={handleLabelChange}
                            />
                            <input
                                type="text"
                                value={currentOption}
                                placeholder="Enter Options"
                                onChange={(e) => { setCurrentOption(e.target.value); }}
                            />
                            <button
                                onClick={() => {
                                    if (currentOption === "") {
                                        alert("Option cannot be empty!");
                                        return;
                                    }

                                    // handle error: if currentOption is already in options, then don't add it
                                    if (options.includes(currentOption)) {
                                        alert("Option already present!");
                                        setCurrentOption("");
                                        return;
                                    }

                                    options.push(currentOption)
                                    setOptions(options);
                                    setCurrentOption("");
                                }}
                            >
                                Add Option
                            </button>
                            <button
                                onClick={() => {
                                    if (label === "") {
                                        alert("Label cannot be empty!");
                                        return;
                                    }
                                    if (options.length === 0) {
                                        alert("There should be atleast two options!");
                                        return;
                                    }

                                    const currentElement = {
                                        type: "dropdown",
                                        name: "dropdown_type",
                                        label,
                                        options
                                    };

                                    // handle error: if currentElement is already in formJSON, then don't add it
                                    if (alreadyPresent(currentElement)) {
                                        alert("Element already present!");
                                        setLabel("");
                                        setOptions([]);
                                        return;
                                    }

                                    setFormJSON([...formJSON, currentElement]);
                                    setOptions([]);
                                    setCurrentOption("");
                                    setLabel("");
                                }}
                            >
                                Add
                            </button>
                        </div>
                    )
                }

                {
                    currentElementType === "text_type" && (
                        <div>
                            <h3>Text Type</h3>
                            <input
                                type="text"
                                value={label}
                                placeholder="Enter Label"
                                onChange={handleLabelChange}
                            />
                            <button
                                onClick={() => {
                                    if (label === "") {
                                        alert("Label cannot be empty!");
                                        return;
                                    }

                                    const currentElement = {
                                        type: "text",
                                        name: "text_type",
                                        label
                                    }

                                    // handle error: if currentElement is already in formJSON, then don't add it
                                    if (alreadyPresent(currentElement)) {
                                        alert("Element already present!");
                                        setLabel("");
                                        return;
                                    }

                                    setFormJSON([...formJSON, currentElement]);
                                    setCurrentElementType("");
                                    setLabel("");
                                }}
                            >
                                Add
                            </button>
                        </div>
                    )
                }

            </section>

            <section className='previewSection'>
                {
                    formJSON.length === 0 && (
                        <div>
                            <h1>Form is Empty!</h1>
                        </div>
                    )
                }
                {
                    formJSON.length !== 0 && (
                        <div className="box">
                            <h1>Form Preview</h1>
                            {
                                formJSON.map((item, index) => {
                                    if (item.name === "file_type") {
                                        return (
                                            <div className='form-verify-element' key={index}>
                                                <span>File Type</span>
                                                <span>{item.label}</span>
                                                <button onClick={() => { handleDelete(index); }} >
                                                    Delete
                                                </button>
                                            </div>
                                        );
                                    } else if (item.name === "dropdown_type") {
                                        return (
                                            <div className='form-verify-element' key={index}>
                                                <span>Dropdown Type</span>
                                                <span>{item.label}</span>
                                                <br></br>
                                                <br></br>
                                                <span>Options:</span>
                                                {
                                                    item.options.map((option) => {
                                                        return (<span> {option} </span>);
                                                    })}
                                                <br></br>
                                                <button onClick={() => { handleDelete(index); }} >
                                                    Delete
                                                </button>
                                            </div>
                                        );
                                    } else if (item.name === "text_type") {
                                        return (
                                            <div className='form-verify-element' key={index}>
                                                <span>Text Type</span>
                                                <span>{item.label}</span>
                                                <button onClick={() => { handleDelete(index); }} >
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
                                    setIsSaved(true);
                                }}
                            >
                                Save Form
                            </button>
                        </div>
                    )
                }
            </section>
        </div>
    );
}

export default App;