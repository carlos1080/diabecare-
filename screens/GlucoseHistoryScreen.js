import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Modal,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useGlucose } from "../context/GlucoseContext";
import { GLUCOSE_HIGH_THRESHOLD, GLUCOSE_LOW_THRESHOLD } from "../constants/glucoseConstants";

export default function GlucoseHistoryScreen() {
    const { entries } = useGlucose();
    const [selectedEntry, setSelectedEntry] = useState(null);


    const today = new Date().toISOString().split("T")[0];

    const entriesToday = entries.filter((e) =>
        e.timestamp.startsWith(today)
    );

    const spikesToday = entriesToday.filter(
        (e) => e.glucose < GLUCOSE_LOW_THRESHOLD || e.glucose > GLUCOSE_HIGH_THRESHOLD
    );


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setSelectedEntry(item)}>
            <View style={styles.row}>
                <Text style={styles.cellDate}>
                    {new Date(item.timestamp).toLocaleDateString()}
                </Text>
                <Text style={styles.cellGlucose}>{item.glucose} mg/dL</Text>
                <Text style={styles.cellNote} numberOfLines={1}>
                    {item.note || "-"}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Glucosa</Text>

            {entries.length === 0 ? (
                <Text style={styles.empty}>No hay mediciones registradas.</Text>
            ) : (
                <>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cellDate, styles.headerText]}>Fecha</Text>
                        <Text style={[styles.cellGlucose, styles.headerText]}>Glucosa</Text>
                        <Text style={[styles.cellNote, styles.headerText]}>Nota</Text>
                    </View>

                    <FlatList
                        data={entries.slice().reverse()}
                        keyExtractor={(item) => item.timestamp}
                        renderItem={renderItem}
                        contentContainerStyle={styles.list}
                    />

                    <View style={styles.statsContainer}>
                        <Text style={styles.statsTitle}>Estadísticas de hoy</Text>
                        <Text style={styles.stat}>🗓️ Entradas registradas: {entriesToday.length}</Text>
                        <Text style={styles.stat}>⚠️ Valores fuera de rango: {spikesToday.length}</Text>
                    </View>

                </>
            )}

            {/* Modal con los detalles */}
            <Modal
                visible={!!selectedEntry}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedEntry(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalle de medición</Text>

                        {selectedEntry && (
                            <>
                                <Text style={styles.modalLabel}>Glucosa:</Text>
                                <Text style={styles.modalValue}>{selectedEntry.glucose} mg/dL</Text>

                                <Text style={styles.modalLabel}>Fecha y hora:</Text>
                                <Text style={styles.modalValue}>
                                    {new Date(selectedEntry.timestamp).toLocaleString()}
                                </Text>

                                <Text style={styles.modalLabel}>Nota:</Text>
                                <Text style={styles.modalValue}>{selectedEntry.note || "-"}</Text>
                            </>
                        )}

                        <Pressable
                            style={styles.backButton}
                            onPress={() => setSelectedEntry(null)}
                        >
                            <Text style={styles.backButtonText}>Volver</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f2f2f2",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    list: {
        paddingTop: 8,
    },
    row: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        borderRadius: 8,
        marginBottom: 8,
        alignItems: "center",
    },
    headerRow: {
        backgroundColor: "#e8eff7",
        borderBottomColor: "#d0dce8",
    },
    headerText: {
        fontWeight: "bold",
        color: "#333",
    },
    cellDate: {
        flex: 1,
        fontSize: 14,
        color: "#333",
    },
    cellGlucose: {
        flex: 1,
        fontSize: 14,
        color: "#4e9bde",
        fontWeight: "600",
        textAlign: "center",
    },
    cellNote: {
        flex: 2,
        fontSize: 14,
        color: "#666",
    },
    empty: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 50,
    },
    // Stats styles
    statsContainer: {
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 12,
        marginTop: 24,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    stat: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        width: "85%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center",
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8,
        color: "#444",
    },
    modalValue: {
        fontSize: 16,
        color: "#222",
        marginTop: 4,
    },
    backButton: {
        marginTop: 24,
        backgroundColor: "#4e9bde",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
