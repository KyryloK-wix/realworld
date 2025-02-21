import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRouter} from "expo-router";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    FormControlLabel,
    FormControlLabelText
} from "@/components/ui/form-control";
import {Input, InputField} from "@/components/ui/input";
import {AlertCircleIcon} from "@/components/ui/icon";
import {Button, ButtonText} from "@/components/ui/button";
import articlesStore from "@/store/ArticlesStore";
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [articleText, setArticleText] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [articleTextError, setArticleTextError] = useState('');
    const [apiError, setApiError] = useState('');
    const router = useRouter();
    const richText = useRef();

    const handleEditorChange = (value) => {
        setArticleText(value);
    };

    const handlePublish = () => {
        setApiError(''); // Clear previous API errors
        setTitleError(''); // Clear title error
        setDescriptionError(''); // Clear description error
        setArticleTextError(''); // Clear article text error

        let valid = true;

        // Validation
        if (!title) {
            setTitleError('Title is required');
            valid = false;
        }

        if (!description) {
            setDescriptionError('Description is required');
            valid = false;
        }

        if (!articleText) {
            setArticleTextError('Article Text is required');
            valid = false;
        }

        if (valid) {
            // Logic to handle article publishing (e.g., save data or call API)
            console.log('Article Published:', {title, description, articleText});
            alert('Article Published!');
            articlesStore.createArticle(
                title,
                description,
                articleText, []
            ).then(() => {
                router.push('/profile');
            })
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Create Article</Text>

            {/* Title Field */}
            <FormControl isInvalid={!!titleError} size="md" isRequired>
                <FormControlLabel>
                    <FormControlLabelText>Title</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                    <InputField
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter article title"
                    />
                </Input>
                {titleError && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>{titleError}</FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>

            {/* Description Field */}
            <FormControl isInvalid={!!descriptionError} size="md" isRequired>
                <FormControlLabel>
                    <FormControlLabelText>Description</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                    <InputField
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter article description"
                    />
                </Input>
                {descriptionError && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>{descriptionError}</FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>

            {/* Description Field */}
            <FormControl isInvalid={!!descriptionError} size="md" isRequired>
                <FormControlLabel>
                    <FormControlLabelText>Description</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1" size="md">
                    <InputField
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter article description"
                    />
                </Input>
                {descriptionError && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>{descriptionError}</FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>

            {/* WYSIWYG Article Text Field */}
            {/*<View style={{flex: 1,   alignItems: 'stretch'}}>*/}


            <FormControl isInvalid={!!articleTextError} size="md" isRequired style={{flex: 1}}>
                <FormControlLabel>
                    <FormControlLabelText>Article Text</FormControlLabelText>
                </FormControlLabel>
                <View style={{flex: 1}}>
                    {/*<ScrollView style={styles.editorContainer}>*/}
                    <RichEditor
                        ref={richText}
                        style={styles.richEditor}
                        placeholder="Write your article content here"
                        initialContentHTML={articleText}
                        onChange={handleEditorChange}
                    />
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.setBold,
                            actions.setItalic,
                            actions.insertOrderedList,
                            actions.insertBulletsList,
                            actions.insertLink,
                            actions.insertImage,
                        ]}
                        iconTint="#000"
                    />
                    {/*</ScrollView>*/}
                </View>
                {articleTextError && (
                    <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon}/>
                        <FormControlErrorText>{articleTextError}</FormControlErrorText>
                    </FormControlError>
                )}
            </FormControl>
            {/*</View>*/}
            {/* Publish Button */}
            {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}
            <Button className="w-full self-center mt-4" onPress={handlePublish}>
                <ButtonText>Publish Article</ButtonText>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    headerText: {
        textAlign: 'center',
        color: 'blue',
        fontSize: 24,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    editorContainer: {
        flex: 1,
        marginBottom: 20,
        // minHeight: 300,
    },
    richEditor: {
        flex: 1,
        minHeight: 100,
        // borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
});

export default CreateArticle;
