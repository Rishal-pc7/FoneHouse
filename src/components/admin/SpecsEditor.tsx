'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, List, Grid, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define strict types for the data structures
export type SpecObjectRow = { key: string; value: string };
export type SpecArrayRow = string;
export type SpecsData = Record<string, string> | string[];

interface Props {
    onChange: (data: SpecsData | undefined) => void;
    initialData?: SpecsData | null;
}

export default function SpecsEditor({ onChange, initialData }: Props) {
    const [mode, setMode] = useState<'object' | 'array'>('object');

    // Union type for rows state
    const [rows, setRows] = useState<SpecObjectRow[] | SpecArrayRow[]>([
        { key: '', value: '' }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [pendingMode, setPendingMode] = useState<'object' | 'array'>('object');

    useEffect(() => {
        if (initialData) {
            if (Array.isArray(initialData)) {
                setMode('array');
                setRows(initialData);
            } else {
                setMode('object');
                // Ensure values are strings
                const objRows: SpecObjectRow[] = Object.entries(initialData).map(([key, value]) => ({
                    key,
                    value: String(value)
                }));
                setRows(objRows);
            }
        }
    }, [initialData]);

    const switchMode = (newMode: 'object' | 'array') => {
        // Type check rows before accessing properties
        const hasData = rows.length > 0 && rows.some(row => {
            if (typeof row === 'string') {
                return row.trim() !== '';
            } else {
                return (row as SpecObjectRow).key.trim() !== '' || (row as SpecObjectRow).value.trim() !== '';
            }
        });

        if (hasData) {
            setPendingMode(newMode);
            setShowModal(true);
            return;
        }
        confirmModeSwitch(newMode);
    };

    const confirmModeSwitch = (newMode: 'object' | 'array') => {
        setMode(newMode);
        setRows(newMode === 'array' ? [''] : [{ key: '', value: '' }]);
        onChange(undefined);
        setShowModal(false);
    };

    const addRow = () => {
        if (mode === 'array') {
            setRows([...(rows as SpecArrayRow[]), '']);
        } else {
            setRows([...(rows as SpecObjectRow[]), { key: '', value: '' }]);
        }
    };

    const removeRow = (index: number) => {
        if (mode === 'array') {
            const newRows = (rows as SpecArrayRow[]).filter((_, i) => i !== index);
            setRows(newRows);
            updateOutput(newRows);
        } else {
            const newRows = (rows as SpecObjectRow[]).filter((_, i) => i !== index);
            setRows(newRows);
            updateOutput(newRows);
        }
    };

    const updateRow = (index: number, field: 'key' | 'value', text: string) => {
        if (mode === 'array') {
            const newRows = [...(rows as SpecArrayRow[])];
            newRows[index] = text;
            setRows(newRows);
            updateOutput(newRows);
        } else {
            const newRows = [...(rows as SpecObjectRow[])];
            if (field === 'key') {
                newRows[index] = { ...newRows[index], key: text };
            } else if (field === 'value') {
                newRows[index] = { ...newRows[index], value: text };
            }
            setRows(newRows);
            updateOutput(newRows);
        }
    };

    const updateOutput = (updatedRows: SpecObjectRow[] | SpecArrayRow[]) => {
        if (mode === 'array') {
            const output = (updatedRows as SpecArrayRow[]).filter(v => v.trim() !== '');
            onChange(output.length ? output : undefined);
        } else {
            const output = (updatedRows as SpecObjectRow[]).reduce((acc, row) => {
                if (row.key.trim()) acc[row.key] = row.value;
                return acc;
            }, {} as Record<string, string>);
            onChange(Object.keys(output).length ? output : undefined);
        }
    };

    const getPreviewData = (): SpecsData => {
        if (mode === 'array') {
            return (rows as SpecArrayRow[]).filter(v => v.trim() !== '');
        } else {
            return (rows as SpecObjectRow[]).reduce((acc, row) => {
                if (row.key.trim()) acc[row.key] = row.value;
                return acc;
            }, {} as Record<string, string>);
        }
    };

    const previewData = getPreviewData();

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-3 sm:p-6 shadow-sm">
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Specifications Type</label>
                <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg w-fit">
                    <button
                        type="button"
                        onClick={() => switchMode('object')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'object'
                            ? 'bg-white dark:bg-zinc-700 text-brandBlue shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        <Grid size={16} /> Key-Value Pairs
                    </button>
                    <button
                        type="button"
                        onClick={() => switchMode('array')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === 'array'
                            ? 'bg-white dark:bg-zinc-700 text-brandBlue shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                    >
                        <List size={16} /> Bullet Points
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-3 sm:p-6 shadow-sm">
                <label className="block text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">
                    {mode === 'object' ? 'Key Features & Specs' : 'Feature List'}
                </label>

                <div className="space-y-3">
                    <AnimatePresence initial={false}>
                        {rows.map((row, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start"
                            >
                                {mode === 'object' && (
                                    <input
                                        type="text"
                                        placeholder="Feature (e.g. Processor)"
                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none text-sm transition-all"
                                        value={(row as SpecObjectRow).key}
                                        onChange={(e) => updateRow(index, 'key', e.target.value)}
                                    />
                                )}
                                <input
                                    type="text"
                                    placeholder={mode === 'object' ? 'Value (e.g. A16 Bionic)' : 'Feature description...'}
                                    className="flex-[2] px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:ring-2 focus:ring-brandBlue outline-none text-sm transition-all"
                                    value={mode === 'array' ? (row as SpecArrayRow) : (row as SpecObjectRow).value}
                                    onChange={(e) => updateRow(index, 'value', e.target.value)}
                                />

                                <div className="sm:w-auto flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(index)}
                                        className="p-2.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors w-full sm:w-auto flex justify-center"
                                        disabled={rows.length === 1}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <button
                    type="button"
                    onClick={addRow}
                    className="mt-4 flex items-center gap-2 text-sm text-brandBlue hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                    <Plus size={16} /> Add New Row
                </button>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
                <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400">Live Preview</label>
                <div className="prose dark:prose-invert max-w-none text-sm">
                    {mode === 'object' ? (
                        Object.keys(previewData as Record<string, string>).length > 0 ? (
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                {Object.entries(previewData as Record<string, string>).map(([key, value]) => (
                                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 dark:border-zinc-700 pb-1">
                                        <dt className="font-medium text-gray-700 dark:text-gray-300">{key}</dt>
                                        <dd className="text-gray-500 dark:text-gray-400 text-right">{String(value)}</dd>
                                    </div>
                                ))}
                            </dl>
                        ) : (
                            <p className="text-gray-400 italic">Add specifications to see them here...</p>
                        )
                    ) : (
                        (previewData as SpecArrayRow[]).length > 0 ? (
                            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                                {(previewData as SpecArrayRow[]).map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic">Add bullet points to see them here...</p>
                        )
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                            onClick={() => setShowModal(false)}
                        />
                        <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-zinc-800 pointer-events-auto overflow-hidden"
                            >
                                <div className="p-6 text-center">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle className="text-amber-500" size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Change Specification Type?</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Switching modes will clear your current entries. This action cannot be undone.
                                    </p>
                                </div>

                                <div className="flex border-t border-gray-100 dark:border-zinc-800 divide-x divide-gray-100 dark:divide-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-4 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => confirmModeSwitch(pendingMode)}
                                        className="flex-1 px-4 py-4 text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                    >
                                        Confirm & Switch
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
